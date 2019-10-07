import axios from 'axios';
import {
    RECEIVE_PERMISSIONS,
    RECEIVE_PERMISSIONS_ERROR, RECEIVE_ARTWORKS_ERROR, RECEIVE_PROFILE
} from "../constants/constantsAction";
import {apiURL, permissionURL, profileURL} from "../constants/constantsApi";
import {receiveProfileError} from "./actionsProfile";

