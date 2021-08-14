
import { ApisService } from './../../_services/apis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  conversations: any
  username = localStorage.getItem('username')
  users: any

  constructor(public _apis: ApisService, public _router: Router, public _activatedRoute: ActivatedRoute, private _auth: AuthService) { }

  getAllChats() {
    this._apis.getConversations().subscribe((res: any) => {
      this.conversations = res.data.getConversations
    },
      (err) => {
        this.conversations = null
      }
    )
  }
  delete(conversationId: string) {
    this.conversations = this.conversations.filter(item => item._id != conversationId);
    this._apis.deleteConversation(conversationId).subscribe((res) => {
      this._router.navigateByUrl('/home')
    })
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this._router.navigate(['/signin'])
  }

  getUsers() {
    this._apis.getUsers().subscribe((res: any) => {
      this.users = res.data.users
      console.log(this.users)
    })
  }

  ngOnInit(): void {
    this.getAllChats()
    this.getUsers()
  }

}
