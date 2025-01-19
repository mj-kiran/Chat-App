// here it is used to get intellisense for the env variables
// Refer vite Document for further updates given below
// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript

interface ImportMetaEnv{
    readonly VITE_COMMON_BASE_API:string  
}
interface ImportMeta{
    readonly env:ImportMetaEnv
}