import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Input, Space} from "antd";
import LoadingCard from "components/LoadingCard";
import {createPost} from "redux/slices/postSlice";
import {useDispatch, useSelector} from "react-redux";

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({title: "", body: ""});
    const {post, loading} = useSelector((state) => state.app);
    const [showPost, setShowPost] = useState(false);
    const {title, body} = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({values}));
        setValues({title: "", body: ""});
        setShowPost(true);
    };

    const showPostBlog = () => {
        return (
            <>
                {loading ? (
                    <LoadingCard count={1}/>
                ) : (
                    <div className="site-card-border-less-wrapper">
                        <Card type="inner" title={post[0].title}>
                            <p>User Id: {post[0].id}</p>
                            <span>{post[0].body}</span>
                        </Card>
                    </div>
                )}
            </>
        );
    };
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                <Input
                    placeholder="Enter Title"
                    type="text"
                    onChange={(e) => setValues({...values, title: e.target.value})}
                    value={title}
                    style={{width: "400px"}}
                />
                <br/>
                <br/>
                <Input.TextArea
                    placeholder="Enter Body"
                    type="text"
                    onChange={(e) => setValues({...values, body: e.target.value})}
                    value={body}
                    style={{width: "400px"}}
                    size="large"
                />
                <br/>
                <br/>
                <Space style={{margin: 10}}>
                    <Button onClick={() => navigate("/")}>Go Back</Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </form>
            <br/>
            <br/>
            {showPost && <div>{showPostBlog()}</div>}
        </div>
    );
};

export default CreatePost;