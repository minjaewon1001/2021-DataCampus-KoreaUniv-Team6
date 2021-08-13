# Tensorflow_wrapper + 그와 관련된 함수와 arguments, attribute, class, Module 등등, 정리(공식 문서)

#### [tensorflow.keras.layers.wrapper] What is it?
래퍼는 다른 layer를 취해서 합병한다.
이 클래스는 추상 클래스로, 개별 레이어로 사용할 수 없다. 
사용 가능한 두 wrapper는 TimeDistributed 및 Bidirectional 가 있다.

[tensorflow 공식 문서]https://www.tensorflow.org/api_docs/python/tf/keras/layers/Wrapper

##### [tensorflow.keras.layers.TimeDistributed] What is it?
순차적으로 들어오는 모든 입력에 대해 레이어에 적용할 수 있게 함.\
입력은 적어도 3차원 이상을 요구하며, 첫 번째 입력의 1차원에 해당하는 값은 시간을 의미한다. \
channels_last 데이터 타입의 32개의 비디오, 128 * 128 * 3 (128 픽셀에 RGB 채널 3개), 10 timestep(아마도 프레임을 의미하는 듯) 을 나타내면,\
(32, 10, 128, 128, 3)이라고 할 수 있다. 

>이 경우, TimeDistributed를 사용하여 10개의 timestep 에 개별적으로 Conv2D(합성곱)을 사용할 수 있다.
>   > inputs = tf.keras.Input(shape=(10, 128, 128, 3))\
conv_2d_layer = tf.keras.layers.Conv2D(64, (3, 3))\
outputs = tf.keras.layers.TimeDistributed(conv_2d_layer)(inputs)\
outputs.shape
>   >   > TensorShape([None, 10, 126, 126, 64])

TimeDistributed 는 각 timestemp에 동일한 Conv2D 인스턴스를 적용 하기 때문에 각 timestemp에서 동일한 가중치 집합이 사용됩니다.

[tensorflow 공식 문서]https://www.tensorflow.org/api_docs/python/tf/keras/layers/TimeDistributed

##### [tensorflow.keras.layers.Bidirectional] What is it?
RNN에 사용되는 양방향 wrapper이다.
>tf.keras.layers.Bidirectional(\
    layer, merge_mode='concat', weights=None, backward_layer=None,\
    \**kwargs
)
Arguments에 대한 자세한 설명은 공식 문서 참고

간단히 말하자면,\
layer -> keras.layers.RNN, keras.layers.LSTM, keras.layers.GRU 객체이거나 혹은 밑의 조건을 만족하는 keras.layers.layer 객체임. 
1. Sequence-processing layer (3차원 이상의 입력이 가능해야 함) 
2. go_backwards, return_sequences, return_states 함수를 가지고 있어야 함. (의미론적으로 RNN을 의미)
3. input_spec 함수가 필요함 
등등... 이하는 말로 써도 이해가 안 될듯,,

merge_mode -> RNN 레이어의 forward 와 backward 의 출력 값을 어떻게 결합할 지를 결정함 . default 값은 concat

backward_layer -> backwards의 인풋값을 조정하기 위해 사용되는 값으로, RNN 혹은 layer에서 사용됨.

[tensorflow 공식 문서] https://www.tensorflow.org/api_docs/python/tf/keras/layers/Bidirectional

##### [tensorflow.keras.layers.Conv2D] what is it?
>tf.keras.layers.Conv2D(\
    filters, kernel_size, strides=(1, 1), padding='valid',\
    data_format=None, dilation_rate=(1, 1), groups=1, activation=None,\
    use_bias=True, kernel_initializer='glorot_uniform',\
    bias_initializer='zeros', kernel_regularizer=None,\
    bias_regularizer=None, activity_regularizer=None, kernel_constraint=None,\
    bias_constraint=None, \**kwargs
)

tensor로 된 출력값을 내기 위해 layer에 입력된 값을 convolved하는 convolutional kernal 을 만드는 layer입니다. 
이 layer를 모델의 첫 번째 layer로 사용할 때에는 , input_shape 에 값을 입력해야 합니다!!!!!!!! 
하지만 동적인 사이즈를 가지고 있다면 None을 입력하세요

Arguments에 대한 자세한 설명은 공식 문서 참고

[tensorflow 공식 문서] https://www.tensorflow.org/api_docs/python/tf/keras/layers/Conv2D
