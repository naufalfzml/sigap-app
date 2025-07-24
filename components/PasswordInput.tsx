import React, { useState } from 'react';
import { View, Pressable, TextInputProps } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Lock, Eye, EyeOff } from 'lucide-react-native'; // Sesuaikan path

type PasswordInputProps = TextInputProps;

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Lock className="absolute left-3 top-3.5 z-10" color="gray" size={20}/>
      <Input
        className="pl-12 pr-12"
        secureTextEntry={!showPassword}
        {...props}
      />
      <Pressable onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5">
        {showPassword ? <EyeOff color="gray" size={20}/> : <Eye color="gray" size={20}/>}
      </Pressable>
    </View>
  );
};

export default PasswordInput;