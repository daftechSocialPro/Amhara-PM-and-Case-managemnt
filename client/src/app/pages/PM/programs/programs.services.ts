import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ResponseMessage, SelectList } from '../../common/common';
import { Program } from './Program';


@Injectable({
    providedIn: 'root',
})
export class ProgramService {
    constructor(private http: HttpClient) { }
    BaseURI: string = environment.baseUrl + "/PM/Program"


    //program 

    createProgram(program: Program) {
        return this.http.post(this.BaseURI, program)
    }

    getPrograms(subOrgId: string) {
        return this.http.get<Program[]>(this.BaseURI + "?subOrgId=" + subOrgId)
    }

    getProgramsSelectList(subOrgId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/selectlist?subOrgId=" + subOrgId)

    }

    getProgramById(value: string) {

        return this.http.get<Program>(this.BaseURI + "/id?programId=" + value)

    }

    updateProgram(program: Program) {
        return this.http.put<ResponseMessage>(this.BaseURI + "/editProgram", program)
    }

    deleteProgram(programId: string) {
        return this.http.delete<ResponseMessage>(this.BaseURI + "/deleteProgram?programId=" + programId)
    }


}