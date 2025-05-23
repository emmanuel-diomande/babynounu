import { ParentsService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { SearchParentCriteriaDto } from './dto/search-parent-criteria.dto';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentsService);
    GetParents(): Promise<import("./models/parent.model").ProfilParents[]>;
    GetParent(id: string): Promise<any>;
    Create(createParentDto: CreateParentDto, files: any): Promise<import("./models/parent.model").ProfilParents>;
    UpdateParent(id: string, updateParentDto: UpdateParentDto, files: any): Promise<import("./models/parent.model").ProfilParents>;
    DeleteParent(id: number): void;
    searchParent(searchCriteria: SearchParentCriteriaDto): Promise<any[]>;
}
