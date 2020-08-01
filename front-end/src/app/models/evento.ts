import { Autoridad } from './autoridad';

export interface Evento {
    allDay:boolean;
    start: string;
    end: string;
    title: string;
    backgroundColor: string;
    autoridades?: Autoridad[];
}