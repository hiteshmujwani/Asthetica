import {View, Text, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {handleSaveShop} from '../../../store/slice/SavedShopSlice';
import RemoveSavedModal from './RemoveSaveModal';

type ShopItemProps = {
  item: {
    ShopProfileImage: any;
    name: string;
    location: string;
    distance: number;
    rating: number;
    id: string;
  };
};

const ShopCard = ({item}: any) => {
  const savedShops = useSelector((state: any) => state.saved);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [removeableShop, setRemoveableShop] = useState('');
  const isSaved =
    savedShops.length > 0 &&
    savedShops.some((shop: any) => shop.name === item.name);
  return (
    <>
      <View className="bg-white mb-6 p-4 rounded-2xl flex flex-row gap-3">
        <Image
          className="h-[80px] w-[80px] rounded-2xl"
          source={item.ShopProfileImage}
        />
        <View className="flex-1 flex-row justify-between">
          <View className="flex gap-2">
            <Text className="text-lg font-extrabold">{item.name}</Text>
            <Text className="text-sm text-black/60 font-bold">
              {item.location.substring(0, 20)}...
            </Text>
            <View className="flex flex-row gap-4">
              <View className="flex flex-row items-center gap-1">
                <Icon name="location-sharp" size={15} color={'#FF8C42'} />
                <Text className="text-sm font-bold">{item.distance} Km</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Icon name="star" size={15} color={'#FF8C42'} />
                <Text className="text-sm font-bold">{item.rating}</Text>
              </View>
            </View>
          </View>
          <Icon
            onPress={() =>
              isSaved
                ? (setShowModal(!showModal), setRemoveableShop(item))
                : dispatch(handleSaveShop(item))
            }
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={25}
            color={'#FF8C42'}
          />
        </View>
      </View>
      <RemoveSavedModal
        showModal={showModal}
        setShowModal={setShowModal}
        removeableShop={removeableShop}
      />
    </>
  );
};

export default ShopCard;
