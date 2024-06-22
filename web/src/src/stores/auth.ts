import { defineStore } from 'pinia'


import type { AuthState } from '@/types/AuthState'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => {
        return {
            token: ""
        }
    },
    actions: {
        init_store() {
            this.token = "";
        },
        set_token(token: string) {
            this.token = token;
        }
    }
})
