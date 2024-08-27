import * as bcrypt from 'bcryptjs'

export class User {
    constructor(public email:string, public password:string, public verified:boolean) {}
    async checkPassword(password:string):Promise<boolean> {
        let isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    }
}