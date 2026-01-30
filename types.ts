
export interface ProfileData {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface Post {
  id: string;
  url: string;
  caption: string;
  likes: number;
  comments: number;
}

export interface Story {
  id: string;
  url: string;
  link?: string;
}
