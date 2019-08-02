const { MongoClient } = jest.genMockFromModule('mongodb');
//manual mock, it must be here.
//i can also have my default mocks here. but i will change them and change them back in the test code, so no need to duplicate the code here.
MongoClient.ok = 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
MongoClient.connect = async (dbString: string) => {
    throw new Error("haven't implemented connect function");
};

module.exports = {
    MongoClient
};
