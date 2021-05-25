import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class Reducir {
    dias: string[] = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabados',
        'Domingos'
    ];

    getDias() {
        return of(this.dias);
    }
}
