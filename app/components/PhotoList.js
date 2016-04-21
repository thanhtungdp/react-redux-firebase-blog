import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Photo from './Photo';

export default class PhotoList extends Component {

    constructor() {
        super(...arguments);
        this.scrollToLoad.bind(this)();
        this.state = {
            modalPhoto: {
                show: false,
                image: ''
            }
        };
    }

    nextPage() {
        this.props.actions.searchNextPageAction();
    }

    scrollToLoad() {
        window.addEventListener('scroll', function () {
            if (this.props.status == 'DONE') {
                console.log(document.body.scrollHeight + 'vs' + document.body.scrollTop + 'vs' + window.innerHeight);
                if (document.body.scrollHeight <= document.body.scrollTop + window.innerHeight) {
                    this.nextPage();
                }
            }
        }.bind(this));
    }

    showModalPhoto(image_url) {
        let modalPhoto = Object.assign({}, this.state.modalPhoto, {show: true, image: image_url});
        console.log(modalPhoto);
        this.setState({modalPhoto: modalPhoto});
    }

    onClosePhoto(){
        this.setState({modalPhoto: {show: false}})
    }

    render() {
        return (
            <div>
                <div className="row">
                    {
                        this.props.photos.map((item, index)=> {
                            return (
                                <div className="col-md-3 image-item" key={`PhotoItem_${item.id}_${index}`}
                                     onClick={this.showModalPhoto.bind(this, item.image_url)}>
                                    <img src={item.image_url} alt=""/>
                                </div>
                            )
                        })
                    }
                    <div className="cleafix"/>
                </div>
                {
                    (() => {
                        if (this.props.status == 'DONE') {
                            return (
                                <div style={{marginBottom: '20px'}} className="row">
                                    <div className="col-md-6 col-md-offset-3">
                                        <button onClick={this.nextPage.bind(this)} type="button"
                                                className="btn btn-default btn-lg btn-block">
                                            Load more
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    })()
                }
                {
                    (()=> {
                        if (this.props.status != 'DONE' && this.props.page > 1) {
                            return (
                                <div className="loading"></div>
                            )
                        }
                    })()
                }
                {
                    this.state.modalPhoto.show == true ? (
                        <Photo show={true} image={this.state.modalPhoto.image} handleClose={this.onClosePhoto.bind(this)}/>
                    ) : ''
                }
            </div>
        )
    }
}

PhotoList.propTypes = {
    actions: PropTypes.object,
    photos: PropTypes.array,
    status: PropTypes.string,
    page: PropTypes.number
}