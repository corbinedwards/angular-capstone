import { Member } from './member';

export class Band {
    GroupId: number = 0;
    GroupName: string = '';
    OrganizationName: string = '';
    SponsorName: string = '';
    SponsorPhone: string = '';
    SponsorEmail: string = '';
    MaxGroupSize: number = 1;
    Members: Member[] = [];
}
