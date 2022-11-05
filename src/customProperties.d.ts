export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        $dateFormatter: (time: string | any, pattern?: string) => string;
        $getDate: (dateStr?: string) => { date: string; imageIndex: number };
        $bitToMbit: (bit: number) => number;
    }
}
