import mockAxios from 'axios';
import item from "../item.service";

describe('Item Serives API calls Testing', () => {
    it("item service getall() function", async () => {
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: ["item1", "item2", "item3", "item4"]
            })
        );

        const allItems = await item.getall();

        expect(allItems.data).toEqual(["item1", "item2", "item3", "item4"]);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:5000/api/item/getall");
    });
});
