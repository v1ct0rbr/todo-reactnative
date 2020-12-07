import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ActionButton from './ActionButton'


export default function ItemList(props) {



    return (

        <View style={styles.tarefaSingle}>
            <View style={{ flex: 1, width: '100%' }}>
                <TouchableOpacity onLongPress={() => { props.handleFinish(props.object.id); }}>
                    <Text style={[styles.text, props.object.urgente ? styles.urgente : {}, props.object.done ? styles.decorationDone : styles.decorationUnDone]}>{props.object.nome}</Text>
                </TouchableOpacity>

            </View>

            <ActionButton icon="chevron-up" color="black" isButton={false} onPress={() => { props.handleMove(props.index, "up") }} ></ActionButton>
            <ActionButton icon="chevron-down" color="red" isButton={false} onPress={() => props.handleMove(props.index, "down")}></ActionButton>
            <ActionButton icon="edit" color="black" isButton={false} onPress={() => { props.handleEdit(props.object.id) }} ></ActionButton>
            <ActionButton icon="trash" color="red" isButton={false} onPress={() => props.handleRemove(props.object.id)}></ActionButton>
        </View>

    )
}
const styles = StyleSheet.create({
    text: {
        color: "black",
        fontWeight: "600",
        paddingLeft: 5,
        fontSize: 16,
        fontFamily: "Lato_900Black_Italic",

    },
    decorationDone: {
        color: "green",
        textDecorationLine: "line-through",
        textDecorationStyle: "double",
        textDecorationColor: "green"
    },
    decorationUnDone: {
        textDecorationLine: "none",

    },
    urgente: {
        color: "red"
    },

    tarefaSingle: {
        paddingTop: 10,
        width: "100%",
        height: 80,
        borderBottomWidth: 2,
        justifyContent: "center",
        textAlignVertical: "auto",
        alignItems: "center",
        borderColor: "black",
        flexDirection: 'row',
        paddingBottom: 10
    }
});
