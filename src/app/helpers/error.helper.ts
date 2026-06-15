import { ChangeDetectorRef } from '@angular/core';

export function manejarErrorGuardado(
  err: any,
  contexto: string,
  setMensajeError: (msg: string) => void,
  cdr: ChangeDetectorRef,
  mensajeDuplicado: string = 'Ya existe un registro con esa identificación.'
): void {

  console.log(`ERROR ${contexto}`, err);

  if(err.status === 500 && err.error?.error?.includes('Duplicate entry')){
    setMensajeError(mensajeDuplicado);
  } else if(err.status === 0){
    setMensajeError('No se pudo conectar con el servidor.');
  } else {
    setMensajeError('Ocurrió un error al guardar. Intentá de nuevo.');
  }

  cdr.detectChanges();
  setTimeout(() => setMensajeError(''), 3000);

}