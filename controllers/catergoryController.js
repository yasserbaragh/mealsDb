const addCategory = async(req, res) => {
    try {
        const body = req.body

        
        const existingCategory = await Category.findOne({ name: body.name })
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" })
        }

        const category = new Category(body)
        await category.save()

        return res.status(201).json({
            message: "Category created successfully",
            category: category
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Failed to create category" })
    }
}