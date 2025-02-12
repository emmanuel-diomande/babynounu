import { Nounus } from './models/nounu.model';
import { DataSource } from 'typeorm';
export declare const NounusProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Nounus>;
    inject: string[];
}[];
