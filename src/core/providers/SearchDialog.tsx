'use client';

import { useStaticSearch } from 'fumadocs-core/search/client';
import {
    SearchDialog as FumaSearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    type SharedProps,
} from 'fumadocs-ui/components/dialog/search';

// Static (prebuilt) search index, so search works on GitHub Pages.
export default function SearchDialog(props: SharedProps) {
    const search = useStaticSearch();

    return (
        <FumaSearchDialog {...search} {...props}>
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList />
            </SearchDialogContent>
        </FumaSearchDialog>
    );
}
