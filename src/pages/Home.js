import {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Input, Space} from "antd";
import LoadingCard from "components/LoadingCard";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, getPost, setEdit, updatePost} from "redux/slices/postSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [bodyText, setBodyText] = useState('')
    const {loading, post, edit, body} = useSelector(store => store.app);

    useEffect(() => {
        if (body) {
            setBodyText(body)
        }
    }, [body]);


    const handleFetchUser = () => {
        if (!id) return alert('Please Provide an ID');

        dispatch(getPost({id}));

        setId('')
    };

    const handleCreatePost = () => navigate('/create-post')

    return (
        <div className='container'>
            <h1 style={{textAlign: 'center'}}>Fetch Post</h1>
            <Input placeholder='Enter user id'
                   type='number'
                   onChange={(e) => setId(e.target.value)}
                   value={id}
                   style={{width: '300px'}}
            />
            <br/>
            <br/>
            <Space size='small' style={{margin: 10}}>
                <Button type='primary' onClick={handleFetchUser}>Fetch User Post</Button>
                <Button type='primary' onClick={handleCreatePost}> User Post</Button>
            </Space>
            <br/>
            <br/>
            {loading && <LoadingCard count={1}/>}
            {post.length > 0 && (
                <Fragment>
                    <div className="site-card-border-less-wrapper">
                        <Card type='inner' title={post[0].title}>
                            <p>User id: {post[0].id}</p>
                            {edit ? (
                                <>
                                    <Input.TextArea
                                        rows={4}
                                        value={bodyText}
                                        onChange={(e) => setBodyText(e.target.value)}
                                    />
                                    <Space
                                        size="middle"
                                        style={{marginTop: 5, marginLeft: 5}}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                dispatch(
                                                    updatePost({
                                                        id: post[0].id,
                                                        title: post[0].title,
                                                        body: bodyText,
                                                    })
                                                );
                                                dispatch(setEdit({edit: false, body: ""}));
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                dispatch(setEdit({edit: false, body: ""}))
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                </>
                            ) : (
                                <span>{post[0].body}</span>
                            )}
                        </Card>
                        {!edit && (
                            <Space
                                size="middle"
                                style={{marginTop: 35, marginLeft: 5, float: "right"}}
                            >
                                <Button
                                    style={{cursor: "pointer"}}
                                    type="primary"
                                    danger
                                    onClick={() => dispatch(deletePost({id: post[0].id}))}
                                >
                                    Delete
                                </Button>
                                <Button
                                    style={{cursor: "pointer"}}
                                    type="primary"
                                    onClick={() =>
                                        dispatch(setEdit({edit: true, body: post[0].body}))
                                    }
                                >
                                    Edit
                                </Button>
                            </Space>
                        )}
                    </div>
                </Fragment>)
            }
        </div>
    )
}

export default Home