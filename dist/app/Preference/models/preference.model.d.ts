import { Parameter } from 'src/app/parameter/models/parameter.model';
import { ProfilParents } from 'src/app/parent/models/parent.model';
import { Job } from 'src/app/job/models/job.model';
import { ProfilNounus } from 'src/app/nounus/models/nounu.model';
export declare class Preference {
    id: number;
    horaire_disponible: Parameter[];
    zone_de_travail: Parameter[];
    type_services: Parameter[];
    equipement_menager: Parameter[];
    criteres_specifiques: Parameter[];
    certifications_criteres: Parameter[];
    tranche_age_enfants: Parameter[];
    besions_specifiques: Parameter[];
    garde_enfants: Parameter[];
    aide_menagere: Parameter[];
    frequence_des_services: Parameter[];
    horaire_souhaites: Parameter[];
    adress: Parameter[];
    disponibility_du_prestataire: Parameter[];
    zone_geographique_prestataire: Parameter[];
    competance_specifique: Parameter[];
    mode_de_paiement: Parameter[];
    taches: Parameter[];
    langue_parler: Parameter[];
    criteres_selections: Parameter[];
    parents: ProfilParents;
    nounus: ProfilNounus;
    jobs: Job;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
