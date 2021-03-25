{
    //method to submit form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success: function(data){
                   let newPost = createNewPostDom(data.data.post)
                   $('#posts-list>ul').prepend(newPost)
                   deletePost($(' .delete-post-button',newPost))
                },
                error: function(error){
                    console.log(error)                
                }
    
            })
        })

    }

    //method to create a post in DOM
    let createNewPostDom = function(post){
        return $(`<li id ="post-${post._id}">
            <p> 
        
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>

                    ${post.content}
                <br>
                <small>
                    ${post.user.name}
                </small>
            </p>
            <div class="post-comment">
                
                    <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="type your comment here..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="add comment">
                    </form>
                    
                    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
            </div>
        </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type :'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error)
                }
            })
        })
    }


    createPost();
}