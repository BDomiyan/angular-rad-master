export class Base{
    created_at: number;
    updated_at: number;

    constructor(){
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }
}