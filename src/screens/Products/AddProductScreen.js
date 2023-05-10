// import { ImagePicker } from 'expo-image-multiple-picker';
// import { ImageBrowser } from 'expo-image-picker-multiple';
import { Box, Button,CheckIcon, FlatList, Icon, Image, Input, Pressable, ScrollView, Select, Text, TextArea } from 'native-base'
import React, { useMemo, useState } from 'react'
import { StyleSheet } from 'react-native';
import { categories, data } from '../../data/data';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQuery } from 'react-query';
import { addProduct, getCategories } from '../../data/api';
import mime from "mime";
import {useSelector} from 'react-redux'
import { AuthDialog } from '../../components/AuthDialog';
let imagesArray = [];





export default function AddProductScreen({navigation}) {


    const [service,setService] = useState("");
    const [condition,setCondition] = useState("");
    const [product,setProduct] = useState("");
    const [category,setCategory] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [description,setDescription] = useState("");
    const [images,setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [_images, set_Image] = useState([]);
    const [isOpen,setIsOpen] = useState(false);


    const mutation = useMutation(addProduct,{
      onSuccess:(data)=>{
        setPrice("")
        setCategory("")
        setDescription("")
        setProduct("")

        navigation.navigate("MyProduct");
      }
    })

	  let user = useSelector(state=>state.user)

    const {isLoading,data:categories} = useQuery("categories",getCategories);

  //let _images = [];
  const formData = new FormData();
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        allowsMultipleSelection:true,
        aspect: [4, 3],
        quality: 1,
      });

      let img = result.assets.map(r=>{
        let localUri = r.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = mime.getType(localUri);//match ? `image/${match[1]}` : `image`;

        console.log("typeee",(filename))


        let im = { uri: localUri,name:filename, type };
        

        formData.append("img[]",im)
        set_Image(p=>[...p,im]);
        
        return im
      
      })



      setImages(img)
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };


    const handleSave = ()=>{
      let data = {name:product,category,price,condition,quantity,img:_images}

      _images.forEach(i=>{
        // console.log("===imae--",i)

        formData.append("img",i)
      });
      formData.append("name",product);
      formData.append("price",price);
      formData.append("condition",condition);
      formData.append("quantity",quantity);
      formData.append("category",category);
      formData.append("description",description);

      mutation.mutate({token:user.token,data:formData});
    }



    const ImageToUpload = ({item})=>{
      return <Box>
        
        <Image
        alt='user'
          source={{ uri:item.uri}}
          style={{
            height: 150,
            width: 200,
            borderRadius: 10,
            marginHorizontal: 10,
            resizeMode: "contain",
          }}
        />
        </Box>
      
    }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>

    <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />

    <Box flex={1} w='full' bg='white'>
        <Box  p={4} bg='white'>

            <Box p={2}>
                <Input 
                _focus={{bg:"white"}}
                bg='white'
                fontSize={16}
                placeholder="Enter product name"
                value={product}
                onChangeText={text=>setProduct(text)}
                />

            </Box>


            <Box p={2}>
                <Input 
                _focus={{bg:"white"}}
                bg='white'
                fontSize={18}
                placeholder="Enter product price"
                value={price}
                keyboardType='numeric'
                onChangeText={text=>setPrice(text)}
                />

            </Box>


            <Box p={2}>
                <Input 
                _focus={{bg:"white"}}
                bg='white'
                fontSize={18}
                keyboardType='numeric'
                placeholder="Enter product quantity"
                value={quantity}
                onChangeText={text=>setQuantity(text)}
                />

            </Box>


            <Box p={2}>
            <Select 
                fontSize={18}
                _focus={{bg:'white'}}
                bg='white' 
                selectedValue={condition} minWidth="200" 
                accessibilityLabel="Choose product category" 
                placeholder="Product Status" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                        }} mt={1} 
                    onValueChange={itemValue => setCondition(itemValue)}>
                    <Select.Item label="New " value="new" />
                    <Select.Item label="Refurbed" value="refurb" />
                    <Select.Item label="Used" value="used" />
                </Select>
            </Box>

            <Box p={2}>
                <Select 
                fontSize={18}
                _focus={{bg:'white'}}
                bg='white' 
                selectedValue={category} minWidth="200" 
                accessibilityLabel="Product Category" 
                placeholder="Product Category" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setCategory(itemValue)}>
                    {categories?.data?.map(d=><Select.Item   key={d._id} label={`${d.name}`} value={`${d._id}`} />
                        
                    )}
                </Select>
            </Box>


            <Box p={2}>
                <TextArea
                fontSize={18}
                bg='white' 
                placeholder="Product desctiprion"
                _focus={{bg:'white'}}
                value={description}
                onChangeText={text=>setDescription(text)}
                />
            </Box>


           

            <Pressable h={20} 
                  justifyContent='center'
                  alignItems='center'
                  borderWidth={1} borderStyle={'dashed'} 
                  borderColor='blueGray.300'
                  m={2}
                  onPress={pickImage}
                  >    
                    <Text color='gray.400'>Pick Image</Text>
                    
            </Pressable>


            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={images}
              renderItem={ImageToUpload}
            />


            <Button bg='black'  
            onPress={handleSave}
            _text={{font:12}} m={2}>
                <Text fontSize={16} color='white'>{mutation.isLoading?"uploading":"Save"}</Text>
            </Button>
        </Box>
    </Box>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  bgColor:{
    backgroundColor:'red',
  },
  container: {
    paddingTop: 25,
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});
