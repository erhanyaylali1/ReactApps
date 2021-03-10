export const db = {

    users: [
        {
            email: '',
            username: '',
            name: '',
            surname: '',
            phone: '',
            password: '',
            createdAt: '',
            imageUrl: '',
            bio : '',
            location : '',
            website : ''
        },
    ],

    posts: [
        {
            userId: '',
            content: '',
            createdAt: '',
            likesCount: 0,
            commentsCount: 0
        }
    ],

    comments: [
        {
            userId: '',
            postId: '',
            content: '',
            createdAt: ''
        }
    ],

    likes: [
        {
            userId: '',
            postId: '',
            createdAt: ''
        }
    ],

    notifications: [
        {
            reciepent: '',
            sender: '',
            read: 'true | false',
            postId: '',
            type: 'like | comment',
            createdAt: ''
        }
    ]

}

