export class Profile {
    id?: string|undefined;
    address?: string|undefined;
    gender?: string|undefined;

    public constructor(init?:Partial<Profile>) {
        Object.assign(this, init);
    }
}
