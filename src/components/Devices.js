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
    this.state = {data: props.data};
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
          <ArcSlider width='450px' mx='auto'>
            <Txt color='white'>Brightness</Txt>
          </ArcSlider>
        </ControlContainer>
      </Flex>
    );
  }

  doStuff(row, e){

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
    }
    else{
      document.getElementById('room').innerHTML = "";
    }

    if(this.props.data[row.id-1].active=== false){
      this.props.data[row.id-1].selected = false;
    }

    this.setState({data:this.props.data});
  }



};

export default Devices;
