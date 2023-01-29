export class Contact {
    id?: string|undefined;
    name?: string|undefined;
    contacttype: string|undefined;
    email?: string|undefined;

    public constructor(init?:Partial<Contact>) {
        Object.assign(this, init);
    }
}
