import { Injectable } from "@angular/core";
import { Boards } from "src/app/core/trello/entities/boards";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BoardsRepository } from "src/app/core/trello/interfaces/boards.repository";

@Injectable({providedIn: 'root'})

export class BoardsStorageService implements BoardsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(public http: HttpClient){}

    createBoard(boards: Boards): Promise<boolean> {
        
        const httpParams = new HttpParams()
            .set("name", boards.name)
            .set("key", boards.key)
            .set("token", boards.token)
    
        return this.http.post(this.urlTrello, httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        
    }

    getBoard(): Promise<string> {
        const httpParams = new HttpParams()
            .set("key", "2a9daeee4a3dab8021e5405f226939e9")
            .set("token", "ATTA86ca8d7ab7d528fc9364d7814e595e704b98c13fd4fd899bbc54f673f3b64df6DF2B57FE")
    
        return this.http.get<any>(this.urlTrello + "PzkibbJ6", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const idBoard = response.id
                return idBoard
            })
            .catch((error) => {
                return error
            });
    }
    

    updateBoard(id: string, updatedBoards: Boards): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteBoard(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}