import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function FlightList (){

    const flightList = [
        {
            flightNo: 'UA2020',
            dep: 'HND',
            arr: 'JFK'
        },
        {
            flightNo: 'AF101',
            dep: 'HND',
            arr: 'CDG'
        },
        {
            flightNo: 'JA101',
            dep: 'HND',
            arr: 'ITM'
        },
        {
            flightNo: 'UA2020',
            dep: 'HND',
            arr: 'JFK'
        },
        {
            flightNo: 'AF101',
            dep: 'HND',
            arr: 'CDG'
        },
        {
            flightNo: 'JA101',
            dep: 'HND',
            arr: 'ITM'
        },
        {
            flightNo: 'UA2020',
            dep: 'HND',
            arr: 'JFK'
        },
        {
            flightNo: 'AF101',
            dep: 'HND',
            arr: 'CDG'
        },
        {
            flightNo: 'JA101',
            dep: 'HND',
            arr: 'ITM'
        },
        
      ]

    return (
        <View>
            <ScrollView>
            {
              flightList.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{l.flightNo}</ListItem.Title>
                    <ListItem.Subtitle>{l.dep}-{l.arr}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
            </ScrollView>
        </View>
    )
}