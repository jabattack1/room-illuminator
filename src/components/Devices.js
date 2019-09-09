import React from 'react';
import { ArcSlider, Box, Checkbox, Flex, Table, Txt } from 'rendition';
import styled from 'styled-components';


const ControlContainer = styled(Box)`
  border-top-left-radius: 10px;
`;

const Room = styled.p`
  width:500px;
  height:20px;
  position:absolute;
  right:0;
  font-size:15px;
  color:white;
  text-align:center;
  `;

// TODO: Replace this with data loaded from the API

class Devices extends React.Component{

  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {data: props.data,
      id:'0'
    };
  }

  render(){

    const columns = [
      {
        field: 'name',
        label: 'Name',
        sortable: true,
      },
      {
        field: 'active',
        label: 'State',
        sortable: true,
        render(value) {
          return (
            <Flex>
              <Checkbox toggle checked={value} onChange={console.log('love')} className='room' mr={2} />
              <Txt ml={2}>{value ? 'On' : 'Off'}</Txt>
            </Flex>
          );
        },
      },
      {
        field: 'brightness',
        label: 'Brightness',
        sortable: true,
        render(value) {
          return `${value}%`;
        },
      },
    ];

    return (
      <Flex flex='1' mt={4}>
        <Box flex='3' pl={3}>
          <Table
            flex='1'
            columns={columns}
            data={this.props.data}
            rowKey='id'
            onRowClick={this.doStuff.bind(this)}
          />
        </Box>
        <ControlContainer flex='2' ml={3} bg='secondary.main'>
          <Room id='room'></Room>
          <ArcSlider id='slider' width='450px' mx='auto' onValueChange={this.doArc.bind(this)} value={this.state.data[this.state.id].brightness / Math.pow(10, 2)}>
            <Txt color='white'>Brightness</Txt>
          </ArcSlider>
        </ControlContainer>
      </Flex>
    );
  }

  doStuff(row, e){
    console.log('this', this);
    if (e.target.type == "checkbox"){
      this.props.data[row.id-1].active=!this.props.data[row.id-1].active;
    }
    
    for(var i=0;i<this.props.data.length;i++){
      if(this.props.data[i].selected === true && i !== row.id-1){        
        this.props.data[i].selected = false;
      }
    }
    
    this.props.data[row.id-1].selected=!this.props.data[row.id-1].selected;
    
    if(this.props.data[row.id-1].selected === true && this.props.data[row.id-1].active === true){
      document.getElementById('room').innerHTML = this.props.data[row.id-1].name;

      // document.getElementById('slider').setAttribute('value', this.props.data[row.id-1].brightness / Math.pow(10, 2));
      // document.getElementById('slider').value = this.props.data[row.id-1].brightness / Math.pow(10, 2);

      // console.log('vallue', document.getElementById('slider').value);
      
    }
    else{
      document.getElementById('room').innerHTML = "";
    }

    if(this.props.data[row.id-1].active=== false){
      this.props.data[row.id-1].selected = false;
    }

    this.setState({data:this.props.data,
      id:row.id-1
    });
    console.log(document.getElementById('slider'));
  }

  doArc(e){
    // console.log('arc',e);
    // console.log(this);

    for (var k in this.props.data) {
      console.log(this.props.data[k]); 
    }
  }


};

export default Devices;
