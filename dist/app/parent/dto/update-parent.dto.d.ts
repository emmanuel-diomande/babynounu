import { CreateParentDto } from './create-parent.dto';
declare const UpdateParentDto_base: import("@nestjs/common").Type<Partial<CreateParentDto>>;
export declare class UpdateParentDto extends UpdateParentDto_base {
    fullname?: string;
    adresse_mail?: string;
    phone?: string;
    number_of_children?: string;
    budget_estimated?: string;
    disponibility_du_prestataire?: any;
    besions_specifiques?: any;
    garde_enfants?: any;
    aide_menagere?: any;
    frequence_des_services?: any;
    horaire_souhaites?: any;
    adress?: any;
    zone_geographique_prestataire?: any;
    competance_specifique?: any;
    langue_parler?: any;
    mode_de_paiement?: any;
    informations_complementaires?: string;
    userId?: string;
}
export {};
