import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default function ActionButton(props) {

    return (

        <TouchableOpacity onPress={props.onPress} style={props.isButton ? styles.button : styles.rowIcon} >
            {props.title != null
                ?
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.textStyle}>{props.title}</Text>
                    <FontAwesome5 name={props.icon} size={20} color={props.color != null ? props.color : "white"} />
                </View>
                :
                <FontAwesome5 name={props.icon} size={20} color={props.color != null ? props.color : "#ccc"} />
            }
        </TouchableOpacity>

    )


}
const styles = StyleSheet.create({

    textStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 5
    },
    rowIcon: {
        alignItems: 'flex-end',
        flex: 0,
        paddingLeft: 10,
        paddingRight: 5
    },
    button: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 12,
        elevation: 2,
        height: 50,
        textAlignVertical: "center",
        alignItems: "center",
        marginBottom: 2,
        marginRight: 5,
        width: "50%"
    },
    alertButton: {
        backgroundColor: '#f75454',
    },
    confirmButton: {
        backgroundColor: '#5a9957',
    },
    warningButton: {
        backgroundColor: '#ddab13'
    }

})


