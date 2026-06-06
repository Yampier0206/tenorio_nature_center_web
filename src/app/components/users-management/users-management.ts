import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { enviroment } from '../../enviroments';
 
@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-management.html',
  styleUrl: './users-management.css'
})
export class UsersManagement implements OnInit {
 
  private readonly url: string = enviroment.apiUrl;
 
  users = signal<User[]>([]);
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  updatingUserId = signal<number | null>(null);
 
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.users();
    return this.users().filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.last_name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      this.getRoleLabel(u.role).toLowerCase().includes(term)
    );
  });
 
  constructor(
    private _http: HttpClient,
    public authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.loadUsers();
  }
 
  loadUsers(): void {
    this.loading.set(true);
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
    this._http.get<User[]>(this.url + 'users', { headers }).subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.loading.set(false);
      }
    });
  }
 
  getRoleLabel(role: string): string {
    return role === 'ADMIN_ROLE' ? 'Admin' : 'Usuario';
  }
 
  isAdmin(role: string): boolean {
    return role === 'ADMIN_ROLE';
  }
 
  // Compara el id del usuario de la fila con el usuario logueado
  isCurrentUser(userId: number): boolean {
    const current = this.authService.currentUser();
    if (current) return current.id === userId;
 
    const identity = sessionStorage.getItem('identity');
    if (identity) {
      try {
        const parsed = JSON.parse(identity);
        return parsed.id === userId;
      } catch { return false; }
    }
    return false;
  }
 
  toggleRole(user: User): void {
    if (this.isCurrentUser(user.id)) return;
 
    const newRole = user.role === 'ADMIN_ROLE' ? 'USER_ROLE' : 'ADMIN_ROLE';
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
 
    this.updatingUserId.set(user.id);
 
    this._http.put<User>(
      `${this.url}user/${user.id}/role`,
      { role: newRole },
      { headers }
    ).subscribe({
      next: () => {
        this.users.update(list =>
          list.map(u => u.id === user.id ? { ...u, role: newRole } : u)
        );
        this.updatingUserId.set(null);
      },
      error: (err) => {
        console.error('Error al actualizar rol:', err);
        this.updatingUserId.set(null);
      }
    });
  }
 
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
