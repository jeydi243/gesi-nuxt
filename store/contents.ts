import contentsAPI from '@/api/contents';
import { defineStore } from 'pinia';
import { useAuth } from './authentication';
import { ITeacher } from './employees';
export interface IContent {
    authors: Array<any>;
    title: string;
    images?: string[];
    description?: string;
    id: number;
    parts?: Array<any>;
    tags?: Array<any>;
}
export interface StoreContent {
    contents: Array<IContent>;
    loading: boolean;
    defaultContent: IContent;
    error: string;
}
export const useContents = defineStore('contents', {
    state: (): StoreContent => ({
        contents: [],
        loading: false,
        error: '',
        defaultContent: {
            parts: [],
            images: [],
            tags: [],
            authors: [],
            title: '',
            description: '',
            id: 0,
        },
    }),
    actions: {
        async init() {
            try {
                await this.getcontents();
            } catch (er) {
                console.log('Error initializing: ', er);
            }
        },
        async getcontents() {
            try {
                const { data, status } = await contentsAPI.getAll();
                if (status || 200 || status == 201) {
                    console.log(data);
                    data.forEach((element: IContent) => {
                        this.contents.push(element);
                        setTimeout(() => {}, 1000);
                    });
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
            }
        },
        async updateContent({ idContent, update }) {
            try {
                const { status, data } = await contentsAPI.updateById(idContent, update);
                if (status == 200 || status == 201) {
                    var foundIndex = this.contents.findIndex((t) => t.id == data.idContent);
                    if (foundIndex) {
                        this.contents[foundIndex] = data;
                    }
                    return true;
                }
                return false;
            } catch (er) {
                console.log(er);
            }
        },
        async addContent(content) {
            const auth = useAuth();
            // let dat
            try {
                const { status, data } = await contentsAPI.add({ ...this.defaultContent, ...content, authors: [auth.user.id], createdBy: auth.user.id });
                console.log({ data });
                // dat = data
                if (status == 200 || status == 201) {
                    this.contents.unshift(data as IContent);
                    return true;
                }
                return false;
            } catch (err: any) {
                // console.log({ err })
                return err.data.dto_validation_error;
            }
        },
    },
    getters: {
        contents: (state) =>
            function (filter) {
                if (filter) {
                    return state.contents.find((content: IContent) => content.title.toLowerCase().includes(filter.toLowerCase()));
                }
                return state.contents;
            },
    },
});
