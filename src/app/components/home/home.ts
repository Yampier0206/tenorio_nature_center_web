import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { enviroment } from '../../enviroments';
import { Post } from '../../models/post';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public user: any;
  public url: string;
  public posts: Array<Post> = [];

  constructor(
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostService
  ) {
    this.user = _auth.currentUser();
    this.url = enviroment.apiUrl;

    this._route.params.subscribe(params => {
      const idCategory = params['id'];
      if (idCategory) {
        this.loadPostsByCategory(idCategory);
      } else {
        this.loadPosts();
      }
    });
  }

  loadPosts() {
    this._postService.getPosts().subscribe({
      next: (response) => {
        this.posts = response;
      },
      error: (err) => {
        console.log('Error al obtener los posts:', err);
      }
    });
  }

  loadPostsByCategory(id: string) {
    this._postService.getPostsByCategory(id).subscribe({
      next: (response) => {
        this.posts = response;
      },
      error: (err) => {
        console.log('Error al filtrar por categoría:', err);
      }
    });
  }

  isOwner(post: Post): boolean {
    const identity = this._auth.getIdentity();
    return identity && post.user_id === identity.id;
  }
}