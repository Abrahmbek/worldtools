import { Meliked } from "./product";
import { Member } from "./user";

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image?: string;
  bo_id: string | null;
  art_status: string;
  art_likes: number;
  art_views: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: Meliked[];
}

export interface SearchArticlesObj {
  page: number;
  limit: number;
  bo_id: string;
  order?: string | null;
}
export interface SearchMemeberArticlesObj {
  page: number;
  limit: number;
  mb_id: string;
}

export interface BoArticleInput {
  art_subject: string;
  art_content: string;
  art_image: string;
  bo_id: string;
}
