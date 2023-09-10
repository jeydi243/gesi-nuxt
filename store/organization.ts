const axios = '';
import { defineStore } from 'pinia';
import configAPI from '@/api/config';
import orgsAPI from '@/api/orgs';
import { useAuth } from './authentication';

export interface IOrganization {
    classe_id: number;
    img: string;
    name: string;
    org_id: string;
    organization_parent_id: string;
}
export interface StoreOrganization {
    count: number;
    organizations: Array<IOrganization | any>;
    requestError: any;
    responseError: any;
}

export const useOrganization = defineStore('organization', {
    state: () => ({
        count: 0,
        organizations: [
            {
                name: 'G1',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                organization_parent_id: 3,
                classe_id: 2,
                long_name: 'Genie Logiciel - Systemes informatique',
                sub_manager: 'Pere Nsuko',
            },
            {
                name: 'G2',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                long_name: 'Genie Logiciel - Gestion',
                classe_id: 2,
                organization_parent_id: 3,
                sub_manager: 'Nsulo George',
            },
            {
                name: 'G3',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                long_name: 'Design et Multimedia',
                classe_id: 2,
                organization_parent_id: 3,
                sub_manager: 'Ndize Mbirwe',
            },
            {
                name: 'Prépa',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                long_name: 'Reseau et telecom',
                classe_id: 2,
                organization_parent_id: 3,
                sub_manager: 'Kongolo Nbiko',
            },
            {
                name: 'G3',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                long_name: 'Design et Multimedia',
                classe_id: 2,
                organization_parent_id: 3,
                sub_manager: 'Ndize Mbirwe',
            },
            {
                name: 'Prepa',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                long_name: 'Reseau et telecom',
                classe_id: 2,
                sub_manager: 'Kongolo Nbiko',
                organization_parent_id: 3,
            },
        ],

        requestError: null,
        responseError: null,
    }),

    actions: {
        async init() {
            try {
                await this.getOrgs();
            } catch (er) {
                console.log('Error on init organizations: ', er);
            }
        },
        async setRootOrg(payload) {
            try {
                const { data, status } = await configAPI.add(payload);
                console.log({ data }, { status });
                if (status == 200 || status == 201) {
                    this.organizations.unshift(data);
                }
            } catch (error) {
                console.log("Can't add organization: ", error);
            }
        },
        async getOrgs() {
            try {
                const { data, status } = await configAPI.getAll();
                console.log({ data }, { status });
                if (status == 200 || status == 201) {
                    data.forEach((element) => {
                        this.organizations.push(element);
                    });
                }
            } catch (error) {
                console.log("Can't retrieve all organizations: ", error);
            }
        },
        async addOrg(newOrg) {
            const auth = useAuth();
            try {
                const { status, data } = await orgsAPI.add({ ...newOrg, createdBy: auth.user.id });
                console.log({ data });
                if (status == 200 || status == 201) {
                    this.organizations.unshift(data);
                    return true;
                }
                return false;
            } catch (err: any) {
                // console.log({ err })
                return err!.data?.dto_validation_error;
            }
        },
    },
    getters: {
        rootOrg: (state) => state.organizations.find((org: IOrganization) => org.organization_parent_id == null),
        filieres: (state) => state.organizations.filter((org: IOrganization) => (org.classe_id = 2)),
    },
});
