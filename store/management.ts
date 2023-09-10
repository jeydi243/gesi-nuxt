import mgntAPI from '@/api/management';
import contentsAPI from '@/api/contents';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useConfig } from '@/store/config';
import { useOrganization } from './organization';
import { ofetch } from 'ofetch';
export interface IDocument {
    _id?: string;
    code: string;
    name: string;
    description: string;

    show?: boolean;
}
export interface ILookups {
    _id: string;
    classe: string;
    parent_lookups_id: string;
    name: string;
    description: string;
}
export interface IPerson {
    _id: string;
    firstname?: string;
    middlename?: string;
    lastname?: string;
    name?: string;
    gender: 'M' | 'F';
    emails?: string;
    images?: Array<string>;
    telephones?: Array<string>;
}
export interface IEducation {
    _id: string;
    from_school: string;
    name: string;
    start: Date | string;
    end: Date | string;
    description: string;
}
export interface IExperience {
    _id: string;
    company: string;
    position: string;
    start: Date | string;
    end: Date | string;
    description: string;
}
export interface IContact {
    _id: string;
    name: string;
    telephones: Array<string>;
    email: string;
    relationship: string;
}
export interface IEmployee extends IPerson {
    code: string;
    resume_file?: string;
    matricule: string;
    hire_date?: Date;
    position?: string;
    biography?: string;
    educations?: Array<IEducation>;
    onboarding?: Array<Map<string, string>>;
    contacts?: Array<IContact>;
    experiences?: Array<IExperience>;
}
export interface IContent {
    _id: string;
    code: string;
    name: string;
    authors: [];
}
interface IManagement {
    contents: Array<IContent>;
    laptops: string[];
    token: string;
    routeurs: [];
    classes: any[];
    lookups: any[];
    listDocuments: IDocument[];
    listFilieres: Map<string, string>[];
    employees: Array<IEmployee>;
    error: any | null;
}
// const router = useRouter()
export const useManagement = defineStore('management', {
    state: (): IManagement => ({
        contents: [],
        laptops: [],
        lookups: [],
        routeurs: [],
        listDocuments: [],
        listFilieres: [],
        employees: [],
        token: 'null',
        classes: [{ name: "Type d'organisation", code: 'ORG-001', id: '' }],
        error: null,
    }),

    actions: {
        async init() {
            try {
                await this.getAllDocuments();
                await this.getAllEmployees();
            } catch (error) {
                console.log(error);
            }
        },
        async getAllDocuments() {
            this.listDocuments = [];
            console.log('getAllDocuments');
            try {
                const { data, status } = await ofetch(mgntAPI.getDocuments, {});
                console.log({ data }, { status });
                if (status == 200 || status == 201 || status == 304) {
                    data.map((doc) => {
                        doc['show'] = false;
                        return doc;
                    }).forEach((doc) => this.listDocuments.unshift(doc));
                    return true;
                }

                return false;
            } catch (er) {
                console.log(er);
            }
        },
        async getAllEmployees() {
            this.employees = [];
            try {
                const { data, status } = await ofetch(mgntAPI.getEmployees, { method: 'GET' });
                console.log({ status });
                if (status == 200 || status == 201 || status == 304) {
                    // console.log({ employees: JSON.parse(data) })
                    const datat = data; /* JSON.parse(data)*/
                    if (datat.length > 0) {
                        // employees.forEach(this.employees.unshift)
                        datat.forEach((em) => this.employees.unshift(em));
                    } else {
                        this.employees = data;
                    }
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
            }
        },
        async deleteEmployee(employeeID) {
            try {
                const { status } = await ofetch(mgntAPI.deleteEmployee + '/' + employeeID, { method: 'DELETE' });
                if (status == 200 || status == 201) {
                    const index = this.employees.findIndex((emp) => emp._id == employeeID);
                    if (index != -1) this.employees.splice(index, 1);
                    else {
                        console.log("Can't find this employee");
                        return false;
                    }
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
                return false;
            }
        },
        async employeeBy(employeeID) {
            try {
                const { data, status } = await ofetch(mgntAPI.routeEmployees + '/' + employeeID, { method: 'GET' });
                if (status == 200 || status == 201) {
                    const index = this.employees.findIndex((emp) => emp._id == employeeID);
                    this.employees[index] = data[0];
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
            }
        },
        async addArrayField({ field, idEmployee, payload }) {
            try {
                const { data, status } = await ofetch(mgntAPI.addArrayField, { method: 'POST', body: { field, idEmployee, payload } });
                if (status == 200 || status == 201) {
                    const index = this.employees.findIndex((emp) => emp._id == data.id);
                    this.employees[index].experiences!.unshift(data);
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
                return false;
            }
        },
        async addLookups(newLookups: ILookups) {
            try {
                const { data, status } = await $fetch<any>('/management/lookups', { method: 'POST', body: { ...newLookups } }); //mgntAPI.addLookups(id, lookups);
                if (status == 200 || status == 201) {
                    const index = this.lookups.findIndex((emp) => emp._id == data.id);
                    this.lookups[index].experiences!.unshift(data);
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
                return false;
            }
        },
        async addEmployee(newEmployee) {
            try {
                const { data, status, headers } = await ofetch(mgntAPI.addEmployee, { method: 'POST', body: newEmployee });
                if (status == 200 || status == 201) {
                    console.log({ data });
                    this.employees.unshift({ ...data, show: false });
                    return true;
                } else if (status == 304) {
                    console.log('Employee already exists. HEARDS=>', headers);
                }
                console.log(data);
                return false;
            } catch (er) {
                console.log(er);
            }
        },

        async updateElementArrayField(employeeID, field, idElement, payload) {
            try {
                const { data, status, headers } = await ofetch(mgntAPI.updateElementArrayField + '/' + employeeID, { method: 'PATCH', body: { field, idElement, payload } });
                console.log({ data, status, headers });
                if ((status == 200 || status == 201) && data != '') {
                    const index = this.employees.findIndex((emp) => emp._id == employeeID);
                    const indexExp = this.employees[index].experiences!.findIndex((exp) => exp['id'] == idElement);
                    if (indexExp != -1) {
                        this.employees[index]!.experiences![indexExp] = data;
                    } else {
                        return false;
                    }
                    return true;
                } else if (status == 304) {
                    console.log('Experience already exists ', headers);
                    return false;
                }
            } catch (er) {
                console.log(er);
                return false;
            }
        },

        async updateBiography(employeeID, biography) {
            try {
                const { data, status } = await ofetch(mgntAPI.updateBiography + '/' + employeeID, { method: 'PATCH', body: { biography } });
                if ((status == 200 || status == 201) && data != '') {
                    const index = this.employees.findIndex((emp) => emp._id == employeeID);
                    if (index != -1) {
                        this.employees[index].biography = biography;
                    } else {
                        return false;
                    }
                    return true;
                } else if (status == 304) {
                    console.log("Biography can't be updated ");
                    return false;
                }
            } catch (er) {
                console.log(er);
            }
        },
        async changedoc(employeeID, newDoc) {
            try {
                const { data, status } = await ofetch(mgntAPI.updateDocument + '/update/', { body: newDoc, method: 'PATCH' });
                if ((status == 200 || status == 201) && data != '') {
                    const index = this.employees.findIndex((emp) => emp._id == employeeID);
                    if (index != -1) {
                        this.employees[index].resume_file = data; //link to file on server
                    } else {
                        return false;
                    }
                    return true;
                } else if (status == 304) {
                    console.log("Biography can't be updated ");
                    return false;
                }
            } catch (er) {
                console.log(er);
            }
        },
        async updateOnboarding(employeeID, onboarding) {
            try {
                const { data, status } = await ofetch(mgntAPI.updateOnboarding + '/' + employeeID, { method: 'PATCH', body: { onboarding } });
                if ((status == 200 || status == 201) && data != '') {
                    const index = this.employees.findIndex((emp) => emp._id == employeeID);
                    if (index != -1) {
                        this.employees[index].onboarding = onboarding;
                    } else {
                        return false;
                    }
                    return true;
                } else if (status == 304) {
                    console.log("Onboarding can't be updated ");
                    return false;
                }
            } catch (er) {
                console.log(er);
            }
        },
        async addDocument(newDocument) {
            try {
                const { data, status } = await ofetch(mgntAPI.addDocument, { body: newDocument });
                if (status == 200 || status == 201) {
                    this.listDocuments.unshift({ ...data, show: false });
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
                return error!['data']['message'];
            }
        },
        async removeDocument(idDocument) {
            try {
                const { data, status } = await ofetch(mgntAPI.removeDocument, idDocument);
                if (status == 200 || status == 201) {
                    var index = this.listDocuments.findIndex((doc) => doc._id == idDocument);
                    this.listDocuments.splice(index, 1);
                    console.log(data);
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
            }
        },
        async deleteDocument(code) {
            try {
                const { data, status } = await ofetch(mgntAPI.deleteDocument, { body: { code } });
                console.log({ data }, { status });
                if (status == 200 || status == 201) {
                    var index = this.listDocuments.findIndex((doc) => doc.code == code);
                    if (index != -1) this.listDocuments.splice(index, 1);
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
                return false;
            }
        },
        async updateDocument(newValues: IDocument) {
            try {
                const { data, status } = await ofetch(mgntAPI.updateDocument + '/' + newValues._id, { body: newValues });
                console.log({ data });
                if (status < 300) {
                    var index = this.listDocuments.findIndex((doc) => doc.code == data.code);
                    if (index != -1) this.listDocuments[index] = { ...data, show: true };
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
            }
        },
    },
    getters: {
        getContents: (state) => state.contents,
        getEmployees: (state) => state.employees,
        getTeachers: (state) => state.employees,
        getLaptops: (state) => state.laptops,
        getRouteurs: (state) => state.routeurs,
        getListDocuments: (state) => state.listDocuments,
    },
});
