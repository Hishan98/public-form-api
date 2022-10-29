
# Public Form

A simple form to add comments and posts. i used MERN Stack to develop this application.You can find **API** inside of the api folder and 
**front-end** in public-form folder.


## API Reference

#### Create a Post

```http
  POST /api/posts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_name` | `string` | **Required**.Min(6).Max(50)|
| `user_image_url` | `string` | **Required**.Min(6).Max(1024)|
| `post_media` | `file` | **Not Required**.Max(1024) |
| `caption` | `string` | **Required**.Min(6).Max(2048)|

#### Get all the Posts

```http
  GET /api/posts
```


#### Create a Comment

```http
  GET /api/comments
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `post_id` | `string` | **Required**.Min(6).Max(100).regex( Numbers and letters only )|
| `name` | `string` | **Required**.Min(6).Max(100)|
| `url` | `string` | **Required**.Min(6).Max(225) |
| `comment` | `string` | **Required**.Min(6).Max(2048)|


#### Create all Comment in selected Post

```http
  GET /api/comments/${post_id}
```

#### Genarate Random user
```http
  GET /api/user
```
