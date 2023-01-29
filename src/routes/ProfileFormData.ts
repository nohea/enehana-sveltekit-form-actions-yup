import type { Contact } from "$lib/Contact";
import type { Profile } from "src/lib/Profile";

export class ProfileFormData {
    id: string = '';
    fullname: string = '';
    email: string = '';
    profile: Profile = {};

    contacts: Array<Contact>;

    public constructor(init?:Partial<ProfileFormData>) {
        this.contacts = [
            // {
            //     contacttype: 'sometype',
            //     name: 'joey schmoe',
            // },
        ];
        Object.assign(this, init);
    }
}
