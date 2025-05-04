export type Props = Record<string, any>;

export interface ExtendedContext<T> {
    state: T[];
    setter: React.Dispatch<React.SetStateAction<T[]>>;
    adder: (t: T) => void;
}

export interface Room {
    fullname: string;
    shortname: string;
    number: string;
    name: string;
    address: string;
    lat: number;
    lon: number;
    seats: number;
    type: string;
    furniture: string;
    href: string;
}