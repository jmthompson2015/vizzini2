#! /bin/bash

export BASE=/Volumes/StorageDrive/jmthompson/git/vizzini2/boardgame

cd chess
./viewtest-suite.sh

cd ../tictactoe
./viewtest-suite.sh

cd ..
./viewtest-suite.sh