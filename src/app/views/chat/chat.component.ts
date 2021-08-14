import { ApisService } from './../../_services/apis.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat = []
  username = localStorage.getItem('username')
  author: string
  message: string
  loader = true
  @ViewChild('chatContainer') chatContainer!: ElementRef
  constructor(private _activatedRoute: ActivatedRoute, private _apis: ApisService) {
  }
  getChat(conversationId: string) {
    this._apis.getCoversation(conversationId).subscribe((res: any) => {
      this.chat = res.data.conversation.messages
      this.author = res.data.conversation.userOne == this.username ? res.data.conversation.userTwo : res.data.conversation.userOne
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight
      }, 100)
      this.loader = false

      this._apis.subscribeMessage(conversationId).subscribe((res: any) => {
        this.chat = [...this.chat, res.data.message]
        setTimeout(() => {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight
        }, 100)


      })
    })
  }

  sendMessage() {
    this._apis.sendMessgae(this.message, this.author).subscribe((res: any) => {
      this.message = ''
    })
  }
  ngOnInit(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this._activatedRoute.params.subscribe((params) => {
        this.getChat(params.id)
      })
    } else {
      this.chat = null
    }


  }

}
