import PropTypes from 'prop-types';

export default function Footer(props){
    return(
        <footer>
            <div className="footer-container" style = {{backgroundColor: "black", color: "white", padding: "10px", textAlign: "center"}}>
                <h6>{props.title}</h6>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    title: PropTypes.string.isRequired
}

Footer.defaultProps = {
    title: 'Name - Institution',
};