cd ~/opencv/build
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_LIBV4L=ON -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib/modules/ ..
make -j4
sudo make install
make clean
