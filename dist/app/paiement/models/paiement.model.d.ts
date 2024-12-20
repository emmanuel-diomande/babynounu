import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
export declare class Paiements {
    id: string;
    transaction: string;
    amount: number;
    customer_name: string;
    customer_surname: string;
    customer_email: string;
    customer_phone_number: string;
    customer_address: string;
    customer_city: string;
    customer_country: string;
    customer_state: string;
    customer_zip_code: string;
    abonnement: Abonnements;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
