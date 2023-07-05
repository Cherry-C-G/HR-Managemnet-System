import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth.service';
import { AvatarService } from '../shared/avatar.service';
import { CommentService } from '../shared/comment.service';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  fileUrl:string = environment.FileURL
  role: string = '';
  status:string=''
  name!: string;
  avatar!: string;
  comment!: string;
  documentComment!: { title: string; comment: string; }[];
  constructor(private commentService:CommentService,private avatarService:AvatarService,private authService: AuthService, private http: HttpClient, private router: Router, private statusService: StatusService) {
    this.statusService.getStatus().subscribe(res => {
      if (res === 'Open') {
        this.router.navigate(['/OnBoarding']);
      }
      this.status = res;
      console.log(this.status);
    });

    this.statusService.getName().subscribe(name => {
      this.name = name;
    });

    this.avatarService.getAvatar().subscribe(avatar => {
      this.avatar = avatar;
    });
  }

  ngOnInit() {
    this.authService.getRole().subscribe(role => {
      this.role = role;
    });   
    this.commentService.getComment().subscribe(comment => {
      this.comment = comment;
    });
    
    this.commentService.getDocumentComment().subscribe(documentComment => {
      this.documentComment = documentComment;
    });
  }

  onAvatarPathEmitted(value:string){
    console.log(value);
  }
}
