import { Component } from "react";
import CommentList from "./CommentList";
//import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
	state = {
		comments: [],
		isLoading: true,
		isError: false,
	};

	componentDidUpdate = async (prevProps) => {
		if (prevProps.asin !== this.props.asin) {
			this.setState({
				isLoading: true,
			});
			try {
				let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
					headers: {
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDgwNzBkOGEyMDAwMThhNDhhNjIiLCJpYXQiOjE3MDQ3Mjc1MjksImV4cCI6MTcwNTkzNzEyOX0.UXY0SfVSXPUogf5KXEBRkoh-xEjKIfCnDPhSgLEpTFs",
					},
				});
				console.log(response);
				if (response.ok) {
					let comments = await response.json();
					this.setState({
						comments: comments,
						isLoading: false,
						isError: false,
					});
				} else {
					this.setState({ isLoading: false, isError: true });
				}
			} catch (error) {
				console.log(error);
				this.setState({ isLoading: false, isError: true });
			}
		}
	};

	render() {
		return (
			<div className="text-center">
				{this.state.isLoading && <Loading />}
				{this.state.isError && <Error />}
				{/*<AddComment id={this.props.asin} />*/}
				<CommentList commentsToShow={this.state.comments} />
			</div>
		);
	}
}

export default CommentArea;
