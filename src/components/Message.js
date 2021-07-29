import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearMsg } from '../redux/actions/MsgActions';

const Message = ({msg, clearMsg}) => {

  useEffect(() =>{
    clearMsg();
  },[])
  if(!msg.errorMsg && msg.successMsg){
    return (
      <div className="alert alert-success text-white shadow bg-success" role="alert">
        {msg.successMsg}
      </div>
    )
  }
  else if(!msg.successMsg && msg.errorMsg){
    return(
      <div className="alert alert-danger text-white shadow bg-danger" role="alert">
        {msg.errorMsg}
      </div>
    )
  }
  else{
    return(
      <>
      {msg.msgType ?
        <div className="alert alert-danger text-white shadow bg-danger" role="alert">
          {msg.msgType}
        </div> : null}
      </>
    );
  }
}

Message.propTypes = {
  msg : PropTypes.object.isRequired,
  clearMsg : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  msg: state.msg,
});

export default connect(mapStateToProps, {clearMsg})(Message);
